import type {FieldValT, FilterValT, ICustomer, IField, IFieldBase, IFilters} from "shared/types/types";


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
		return Object.keys(filters).some(fieldName => {
			const {fieldType, value} = filters[fieldName];

			if (fieldType === 'toggle' && value) {
				return item[fieldName] === value;
			}

			return true;
		})
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
		let values: FieldValT = [];

		if (fieldType === 'toggle') {
			values = [name]
		}

		return {
			...field,
			values
		}
	})

	return fieldsWithValues;
}


/*
	Called when a field changes it's value,
	returns a filter object
*/
export function fieldToFilter(e: any, field: IFieldBase): IFilters {

	const {name, fieldType} = field;
	const {checked} = e.target;

	let value = null;
	if (fieldType === 'toggle') {
		value = checked;
	}

	return {
		[name]: {
			fieldType,
			value
		}
	}
}

export function getFieldCheckedVal(field: IFieldBase, filterVal: FilterValT) {
	const {fieldType} = field;
	let checked = false;
	if (fieldType === 'toggle') {
		checked = Boolean(filterVal);
	}
	return checked;
}