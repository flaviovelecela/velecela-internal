import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';

// Set or update user roles (now using the "role" field as an array of roles)
export async function setUserRoles(uid, roles) {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If user does not exist, create a new document with the roles array
      await setDoc(userDocRef, { role: roles });  // Use "role" to match Firestore field
    } else {
      // If user exists, merge with the existing data
      await setDoc(userDocRef, { role: roles }, { merge: true });  // Use "role" to match Firestore field
    }

    console.log('Roles set successfully');
    return true;
  } catch (error) {
    console.error('Error setting roles:', error);
    return false;
  }
}

// Fetch user roles (returns an array of roles from the "role" field)
export async function getUserRoles(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      // Return the "role" array or default to ['user'] if not found
      return userData.role || ['user'];
    } else {
      console.log("No such user!");
      return ['user'];  // Default to 'user' if no document exists
    }
  } catch (error) {
    console.error('Error getting user roles:', error);
    return ['user'];  // Default to ['user'] in case of an error
  }
}

// Check if a user has a specific role
export function hasRole(userRoles, requiredRole) {
  return userRoles.includes(requiredRole);  // Check if the "requiredRole" is in the array
}
