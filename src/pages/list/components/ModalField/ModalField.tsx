import React from "react";
import './ModalField.scss';
import {fieldToFilter, getFieldCheckedVal} from "pages/list/utils/helpers";
import type {FilterValT, IField, IFilters} from "shared/types/types";


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


	function handleOnChange(e: any) {
		onChange(
			fieldToFilter(e, field)
		)
	}
		
	return (
		<div className="fields-ct col p-3" key={`val-${name}`}>
			<div className="field-group">

				<div className="fields-list">
					{fieldVals.map((fieldVal, index) => {

						// Set checked based on the filter
						let checked = getFieldCheckedVal(field, filterVal);

						const id = `${name}-${index}`;

						return (
							<div key={id} className="field px-3 d-flex align-items-center">
								<div className="pe-3 ms-auto">
									<div className="input-checkbox">
										<input
											id={id}
											className="form-check-input"
											type={type}
											name={name}
											value={fieldVal}
											checked={checked}
											onChange={handleOnChange}
										/>
									</div>
								</div>

								<label className="w-100 pe-2" htmlFor={id}>
									{label}
								</label>
								
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}