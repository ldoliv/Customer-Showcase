
export type ICustomer = {
	id: string,
	firstName: string,
	lastName: string,
	birthDate: string,
	email: string,
	avatar: string,
	hasContract: boolean,
	gender: string,
}


// Fields
// ----------------------------------------------

export type FieldTypeT = 'toggle' | 'radio' | 'checkbox'

export type IFieldBase = {
	name: string,
	label: string,
	fieldType: FieldTypeT,
}


export type FieldValT = boolean | string				// <-
export type FieldValsT = FieldValT[]

export type IField = IFieldBase & {
	values: FieldValsT
}


// Filters
// ----------------------------------------------

export type FilterValT = boolean | string | undefined

export type IFilters = {
	[key: string]: {
		fieldType: FieldTypeT,
		value: FilterValT
	}
}

