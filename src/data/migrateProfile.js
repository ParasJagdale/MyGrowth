import { defaultProfile } from "./initialData";

function migrateProfile(savedProfile) {
  if (savedProfile === null || typeof savedProfile !== "object") {
    return defaultProfile;
  }

  const isOldSampleProfile =
    savedProfile.displayName === "Alex Patel" &&
    savedProfile.role === "Software Associate";

  if (isOldSampleProfile) {
    return defaultProfile;
  }

  return savedProfile;
}

export default migrateProfile;
