import create from 'zustand';
import moment from 'moment';

export const useLookups = create((set, get) => ({

    categories: {
        needsUpToDateData: { data: "We don't want THIS after browser refresh", lastUpdate: null },
        dummyProperty: { data: "irrelevant", lastUpdate: null }
    },
    updateData: async (key) => {
        await setTimeout(() => console.log("waited 2 seconds", 500));
        await set((state) => ({
            categories: {
                ...state.categories,
                [key]: {
                    ...state.categories[key],
                    data: "We want THIS after browser refresh",
                    lastUpdate: moment()
                }
            }
        }))
    },
    freshData: async (key) => {
        console.log(key, get().categories[key]);
        if (get().categories[key].lastUpdate && (moment() - get().categories[key].lastUpdate < 300000)) {
            console.log("returning cached data");
            return get().categories[key].data;
        } else {
            console.log("returning updated data");
            return await setTimeout(() => { return (get().updateData(key)) }, 4000);
        }
    }

}));