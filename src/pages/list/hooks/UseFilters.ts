import {config} from 'shared/constants/config';
import useLocalStorageState from 'shared/hooks/UseLocalStorageState';

export default function useFilters() {
	const {LOCAL_APP_FILTERS} = config.localStoreKeys;
	const [filters, setFilters] = useLocalStorageState(LOCAL_APP_FILTERS, {});

	return [filters, setFilters];
}