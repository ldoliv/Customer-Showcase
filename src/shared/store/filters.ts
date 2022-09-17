import {getLocalStore, setLocalStore} from "./helpers";
import {config} from 'shared/constants/config';
import type {IFilters} from "shared/types/types";

const {LOCAL_APP_FILTERS} = config.localStoreKeys;


export const getFiltersFromStore = (): IFilters => {
	return getLocalStore(LOCAL_APP_FILTERS) || {};
}

export const saveFiltersToStore = (filters: IFilters) => {
	setLocalStore(LOCAL_APP_FILTERS, filters);
	return true;
}