require('dotenv').config();
import * as S3 from 'aws-sdk/clients/s3';
import * as fs from 'fs-extra';
import { mFile, mFiles } from '../middlewares/multer.middleware';

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey
});

// Upload a file to aws-s3 and return the key
export async function uploadFile(file: mFile): Promise<string> {
	const path = file.path;
	const filename = file.filename;

	if (process.env.NODE_ENV == 'development') return filename;

	const fileStream = fs.createReadStream(path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: filename
	};

	const result = await s3.upload(uploadParams).promise();
	await fs.unlink(path);

	return result.Key;
}

// Download a file from aws-s3
export function getFileStream(key: string) {
	const downloadParams = {
		Key: key,
		Bucket: bucketName
	};

	return s3.getObject(downloadParams).createReadStream();
}

// Delete file from aws-s3
export function deleteFile(key: string) {
	const deleteParams = {
		Key: key,
		Bucket: bucketName
	};

	return s3.deleteObject(deleteParams).promise();
}

// Arrays

export async function uploadFiles(files: any[]) {
	var keys: string[] = [];

	try {
		for (const file of files) {
			const key = await uploadFile(file);
			keys.push(key);
		}

		return keys;
	} catch (error) {
		throw new Error("Can't save all files.");
	}
}

export async function deleteFiles(keys: string[]) {
	for (const key of keys) {
		try {
			await deleteFile(key);
		} catch (error) {
			console.error("Can't delete file with key: " + key);
		}
	}
}
