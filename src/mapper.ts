import { TypedResource } from "./database/service";
const resourceDatabaseMap: Record<string, Record<string, string>> = {
	'user': {
		userId: '_id',
		firstName: 'first_name',
		lastName: 'last_name'
	},

	'transaction': {
		transactionId: '_id',
		parentId: 'user_id'
	}
};

function mapDatabaseRecord(resource: Record<string, string | number>, reverse = false): TypedResource {
	
	if (!Object.hasOwn(resource, 'type')) {
		return resource as { type: string };
	}

	const type = (resource as { type: string}).type;
	const result: TypedResource = { type: type };

	for (const key in resource) {
		let sourceKey, destinationKey: string;
		destinationKey = key;
		sourceKey = resourceDatabaseMap[type][key] ?? key;

		if (reverse) {
			destinationKey = sourceKey;
			sourceKey = key;
		}
		
		result[destinationKey] = resource[sourceKey];
	}

	return result;
}

export const mapToDBValue = (resource: TypedResource) => {
	return mapDatabaseRecord(resource, true);
}

export const mapFromDBValue = (dbResult: Record<string, string | number>) => {
	return mapDatabaseRecord(dbResult);
}
