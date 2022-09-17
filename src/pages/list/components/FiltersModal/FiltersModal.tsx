import './FiltersModal.scss';
import {useState} from 'react';
import ModalField from '../ModalField';
import {IField, IFilters} from 'shared/types/types';


type IProps = {
	filters: IFilters,
	fields: IField[],
	onFilterChange: (fltrs: IFilters) => void,
}

export function FiltersModal({
	filters,
	fields,
	onFilterChange
}: IProps) {

	const [isOpened, setIsOpened] = useState(false);
	const [modalFilters, setModalFilters] = useState(filters);

	
	const handleFieldOnChange = (filter: IFilters) => {

		const modalFiltersCpy = {
			...modalFilters,
			...filter
		};
		
		setModalFilters(modalFiltersCpy);
	}

	const openModal = () => {
		setIsOpened(true);
	}

	const closeModal = () => {
		setIsOpened(false);
		onFilterChange(modalFilters);
	}


	return (
		<div id="open-filters">

			<div className="open-filters-btn d-flex justify-content-end align-items-center ms-2" onClick={openModal}>
				<i className="fas fa-sliders-h"></i>
			</div>

			<div className={`cs-modal filters-modal ${isOpened ? 'opened' : ''}`}>

				<div className="overlay" onClick={closeModal}></div>

				<div className="cs-modal-outer pt-3 pb-4 d-flex flex-column">

					<div className="d-flex align-items-center mb-2 col-auto px-3">
						<div className="cs-modal-title text-center col">
							<span className="icon me-2">
								<i className="fas fa-sliders-h"></i>
							</span>
							<span className='text'>Filters</span>
						</div>
						<div className="cs-modal-close col-auto" onClick={closeModal}>
							<i className="fas fa-times"></i>
						</div>
					</div>

					<div className="fields-outer-ct px-3">

						{fields.map(field => {
							const {name} = field;
							const filterVal = modalFilters[name]?.value;		// can be single value or array
							
							return <ModalField
								key={`val-${name}`}
								field={field}
								filterVal={filterVal}
								onChange={handleFieldOnChange}
							/>
						})}

					</div>

				</div>
			</div>
		</div>
	)
}