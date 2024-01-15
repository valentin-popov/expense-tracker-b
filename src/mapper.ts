import { flipObject } from './utils';
const resourceDatabaseMap: Record<string, Record<string, string>> = {
	'user': {
		_id: 'userId',
		first_name: 'firstName',
		last_name: 'lastName'
	},

	'transaction': {
		_id: 'transactionId',
		user_id: 'parentId'
	}
};

function mapDatabaseRecord(resource: Record<string, string | number>, reverse = false): Record<string, string | number> {
	
	if (!Object.hasOwn(resource, 'type')) {
		return resource as { type: string };
	}

	const type = (resource as { type: string}).type;
	delete resource.type;

	const result: Record<string, string | number> = {};

	for (const key in resource) {
		let map = resourceDatabaseMap[type];
		if (reverse) {
			map = flipObject(map);
		}
		const sourceKey = key, destinationKey = map[key] ?? key;
		result[destinationKey] = resource[sourceKey];
	}

	return result;
}

export const mapToDBValue = (resource: Record<string, string | number>) => {
	return mapDatabaseRecord(resource, true);
};

export const mapFromDBValue = (dbResult: Record<string, string | number>) => {
	return mapDatabaseRecord(dbResult);
};
