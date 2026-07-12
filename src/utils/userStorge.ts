import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, '../test-data');
const FILE_PATH = path.join(DATA_DIR, 'registeredUsers.json');

interface RegisteredUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registeredAt: string;
}

function saveRegisteredUser(userData: Omit<RegisteredUser, 'registeredAt'>) {
    // Ensure the directory exists
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Read existing users (if file exists), else start with empty array
    let existingUsers: RegisteredUser[] = [];
    if (fs.existsSync(FILE_PATH)) {
        const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
        existingUsers = fileContent ? JSON.parse(fileContent) : [];
    }

    // Append new user with timestamp
    const newUser: RegisteredUser = {
        ...userData,
        registeredAt: new Date().toISOString(),
    };
    existingUsers.push(newUser);

    // Write back to file
    fs.writeFileSync(FILE_PATH, JSON.stringify(existingUsers, null, 2), 'utf-8');
}

export { saveRegisteredUser, RegisteredUser };