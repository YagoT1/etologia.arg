export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

function requireProjectId() {
  const value = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'a1bhfmpi';

  if (!value) {
    throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
  }

  return value;
}

export const projectId = requireProjectId();
