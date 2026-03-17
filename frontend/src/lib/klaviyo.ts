/**
 * Klaviyo Integration
 *
 * Subscribes contacts to Klaviyo lists via the server-side API.
 * Used by contact/signup forms to build the SME email list.
 *
 * API docs: https://developers.klaviyo.com/en/reference/
 */

const KLAVIYO_API = 'https://a.klaviyo.com/api';
const API_REVISION = '2024-02-15';

// SME list ID — "Soul Miners Eden - All Signups"
const SME_LIST_ID = 'Rnef8b';

interface SubscribeOptions {
  email: string;
  name?: string;
  phone?: string;
  source?: string;
}

/**
 * Subscribe a contact to the SME Klaviyo list.
 * Uses the profile-subscription-bulk-create-jobs endpoint which
 * creates the profile and adds to list in one call.
 */
export async function subscribeToList({ email, name, phone, source }: SubscribeOptions): Promise<{ success: boolean; message: string }> {
  const apiKey = import.meta.env.KLAVIYO_API_KEY;

  if (!apiKey) {
    console.warn('[KLAVIYO] API key not configured — skipping subscribe');
    return { success: false, message: 'Klaviyo not configured' };
  }

  try {
    // Subscribe to list (creates profile if needed)
    const res = await fetch(`${KLAVIYO_API}/profile-subscription-bulk-create-jobs/`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'Content-Type': 'application/json',
        'revision': API_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: source || 'website',
            profiles: {
              data: [{
                type: 'profile',
                attributes: {
                  email,
                  ...(phone && { phone_number: phone }),
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } },
                  },
                },
              }],
            },
          },
          relationships: {
            list: {
              data: { type: 'list', id: SME_LIST_ID },
            },
          },
        },
      }),
    });

    if (res.ok || res.status === 202) {
      console.log(`[KLAVIYO] Subscribed ${email} to SME list (source: ${source})`);

      // Update profile with name separately if provided
      if (name && name.trim()) {
        await updateProfileName(apiKey, email, name).catch(() => {});
      }

      return { success: true, message: 'Subscribed' };
    }

    const errorText = await res.text();
    console.error(`[KLAVIYO] Error ${res.status}:`, errorText);
    return { success: false, message: `Klaviyo error: ${res.status}` };
  } catch (err) {
    console.error('[KLAVIYO] Subscribe failed:', err);
    return { success: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Update a profile's name after subscription (separate API call).
 */
async function updateProfileName(apiKey: string, email: string, name: string) {
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  await fetch(`${KLAVIYO_API}/profile-import/`, {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'Content-Type': 'application/json',
      'revision': API_REVISION,
    },
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email,
          first_name: firstName,
          ...(lastName && { last_name: lastName }),
        },
      },
    }),
  });
}
