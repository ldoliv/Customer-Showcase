import './filterbar.scss';
import FiltersModal from '../FiltersModal';
import { buildFields } from 'pages/list/utils/helpers';
import {getCustomerFilterFields, getCustomerPropertyValues} from 'shared/helpers/customers';
import {IFilters} from 'shared/types/types';

type IProps = {
	filters: IFilters,
	onFilterChange: (fltrs: IFilters) => void,
}

export function FilterBar({
	filters,
	onFilterChange
}: IProps) {

	const modalFields = buildFields(
		getCustomerFilterFields(),
		getCustomerPropertyValues
	);

	function handleFilterChange(fltrs: IFilters) {
		onFilterChange({
			...filters,
			...fltrs
		});
	}

	return (
		<div className="filter-bar px-3 py-2 col-auto">
			<div className="d-flex align-items-center justify-content-end">

				<div className="col-auto">
					<FiltersModal
						filters={filters}
						fields={modalFields}
						onFilterChange={handleFilterChange}
					/>
				</div>
			</div>
		</div>
	)
}