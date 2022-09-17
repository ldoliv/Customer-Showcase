
export type ICustomer = {
	firstName: string,
	lastName: string,
	birthDate: string,
	email: string,
	avatar: string,
	hasContract: boolean,
	id: string
}

type FieldTypeT = 'toggle' | 'radio' | 'checkbox'
export type FieldValT = string[]

export type IFieldBase = {
	name: string,
	label: string,
	fieldType: FieldTypeT,
}
export type IField = IFieldBase & {
	values: FieldValT
}




export type FilterValT = boolean

export type IFilters = {
	[key: string]: {
		fieldType: FieldTypeT,
		value: FilterValT
	}
}

