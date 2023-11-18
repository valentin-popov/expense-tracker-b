
interface stringKeyValMap {
	[key:string]: string
};

interface stringKeyMap {
	[key: string]: any
};

const resourceDatabaseMap: {
	[key:string]: stringKeyValMap
} = {
	'user': {
		userId: '_id',
		firstName: 'first_name',
		lastName: 'last_name',
	},

	'transaction': {
		transactionId: '_id',
		userId: 'user_id',
	}
};

function mapDatabaseRecord(resource: stringKeyMap, type: string, reverse = false) {
	if (!(type in resourceDatabaseMap)) {
		return resource;
	}

  	let result: stringKeyMap = {};
	for (const key in resourceDatabaseMap[type]) {
    	let sourceKey, destinationKey: string;
        sourceKey = resourceDatabaseMap[type][key];
		destinationKey = key;

    	if (reverse) {
        	sourceKey = key;
        	destinationKey = resourceDatabaseMap[type][key];
    	}

      	result[destinationKey] = resource[sourceKey];
	}
	
	return result;
};

export const mapToDBValue = (resource: object, type: string) => {
	return mapDatabaseRecord(resource, type, true);
}

export const mapFromDBValue = (dbResult: object, type: string) => {
	return mapDatabaseRecord(dbResult, type);
}
