import FilterBar from "./components/FilterBar";
import CustomerList from './components/CustomerList';
import useCustomers from "./hooks/UseCustomers";
import useFilters from './hooks/UseFilters';
import {filterItems} from './utils/helpers';




export function ListPage() {

	const [filters, setFilters] = useFilters();
	const [{isLoading, error, data: allCustomers}, deleteCustomer] = useCustomers();

	const customers = filterItems(allCustomers, filters);

	
	return (
		<div className="d-flex flex-column h-100">

			<div className="col d-flex flex-column" style={{overflow: 'hidden'}}>

				<FilterBar
					filters={filters}
					onFilterChange={setFilters}
				/>

				<CustomerList
					isLoading={isLoading}
					error={error}
					data={customers}
					onItemDelete={deleteCustomer}
				/>

			</div>

		</div>
	)
}
