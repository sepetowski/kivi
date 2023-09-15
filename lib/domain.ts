let domainUrl = 'https://kivi-app.vercel.app';

if (process.env.NODE_ENV !== 'production') domainUrl = 'http://localhost:3000';

export const domain = domainUrl;
