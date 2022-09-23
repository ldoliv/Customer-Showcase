import React from "react";
import './ModalField.scss';
import {fieldToFilter, getFieldCheckedVal} from "pages/list/utils/helpers";
import type {FilterValT, IField, IFilters} from "shared/types/types";
import {capitalizeFirstLetter} from "shared/helpers";


type IProps = {
	field: IField,
	filterVal: FilterValT,
	onChange: (fltrs: IFilters) => void,
}

export function ModalField({
	field,
	filterVal,
	onChange
}: IProps) {
	
	const {name, label, fieldType, values: fieldVals} = field;
	const type = fieldType === 'toggle' ? 'checkbox' : fieldType;
	const showGroupLabel = fieldType === 'toggle' ? false : true;


	function handleOnChange(e: any) {
		onChange(
			fieldToFilter(e, field)
		)
	}
		
	return (
		<div className="fields-ct col p-3" key={`val-${name}`}>
			<div className="field-group">

				{showGroupLabel && <div className="d-flex justify-content-between">
					<div className="field-group-title ms-2">{label}</div>
				</div>}

				<div className="fields-list">
					{fieldVals.map((fieldVal, index) => {

						// Set checked based on the filter
						let checked = getFieldCheckedVal(fieldType, fieldVal, filterVal);

						const id = `${name}-${index}`;
						const fieldLabel = fieldType === 'toggle' ? label : capitalizeFirstLetter(fieldVal as string)

						return (
							<div key={id} className="field px-3 d-flex align-items-center">
								<div className="pe-3 ms-auto">
									<div className="input-checkbox">
										<input
											id={id}
											className="form-check-input"
											type={type}
											name={name}
											value={fieldVal.toString()}
											checked={checked}
											onChange={handleOnChange}
										/>
									</div>
								</div>

								<label className="w-100 pe-2" htmlFor={id}>
									{fieldLabel}
								</label>
								
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}