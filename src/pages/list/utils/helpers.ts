import type {FieldTypeT, FieldValsT, FieldValT, FilterValT, ICustomer, IField, IFieldBase, IFilters} from "shared/types/types";


// type ObjectType = {
// 	[key: string]: any
// }

// export function filterItems<T extends ObjectType>(items: T[], filters: IFilters): T[] {
// export function filterItems<T, K extends ObjectType>(items: T[], filters: K): T[] {
// export function filterItems(items: ICustomer[], filters: IFilters): ICustomer[] {
export function filterItems(items: any[], filters: IFilters): ICustomer[] {

	if (!Object.keys(filters).length) {
		return items.slice();
	}

	// Filter
	const filtered = items.filter(item => {

		let found = true;

		Object.keys(filters).forEach(fieldName => {
			const {fieldType, value} = filters[fieldName];

			if (value && (fieldType === 'toggle' || fieldType === 'radio')) {
				found &&= item[fieldName] === value;
			}

		})

		return found;

	});

	return filtered;
}

/*
	Builds fields from a base object and adds the values
*/
export function buildFields(
	fields: IFieldBase[],
	getItemPropertyValues: (property: any) => any[]
): IField[] {

	const fieldsWithValues = fields.map(field => {

		const {name, fieldType} = field;
		let values: FieldValsT = [];

		if (fieldType === 'toggle') {
			values = [true]

		} else if (fieldType === 'radio') {
			values = getItemPropertyValues(name);
		}

		return {
			...field,
			values
		}
	})

	return fieldsWithValues;
}



export function getFieldCheckedVal(fieldType: FieldTypeT, fieldVal: FieldValT, filterVal: FilterValT) {

	let checked = false;

	if (fieldType === 'toggle' || fieldType === 'radio') {
		checked = filterVal === fieldVal
	}

	return checked;
}


/*
	Called when a field changes it's value,
	returns a filter object
*/
export function fieldToFilter(e: any, field: IField): IFilters {

	const {checked, value: fieldVal} = e.target;
	const {name, fieldType, values} = field;

	let value = null;
	if (fieldType === 'toggle') {
		value = checked;

	} else if (fieldType === 'radio') {
		value = fieldVal;
	}

	return {
		[name]: {
			fieldType,
			value
		}
	}
}

