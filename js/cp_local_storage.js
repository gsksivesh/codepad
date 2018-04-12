const CODE_PAD_BUCKET = 'code_pad_bucket';
const DEFAULT_BUCKET = {
    'code_cells': [
        {
            _id:'default',
            title:'First code',
            code: ''
        }
    ]
};
const CODE_CELLS_KEY = 'code_cells';
const ID_KEY = '_id';
const CODE_KEY = 'code';
const TITLE_KEY = 'title';


function getIndexObjectArray(array, unique_id) {
    let i = array.length;
    let attr = ID_KEY;
    while (i--) {
        if (array[i]
            && array[i].hasOwnProperty(attr)
            && (array[i][attr] === unique_id)) {
            return i;

        }
    }
    return -1;
}

function getLocalStorageData() {
    let object_in_str = localStorage.getItem(CODE_PAD_BUCKET);
    if (object_in_str == null) {
        return false;
    }
    return JSON.parse(object_in_str);
}

function setLocalStorageData(data_object) {
    localStorage.setItem(CODE_PAD_BUCKET, JSON.stringify(data_object));
    return data_object;
}

function getLocalStorage() {
    let buckets = getLocalStorageData();
    if (buckets) {
        return buckets[CODE_CELLS_KEY];
    }
    buckets = setLocalStorageData(DEFAULT_BUCKET);
    return buckets[CODE_CELLS_KEY];
}

function updateLocalStorage(code_cells) {
    setLocalStorageData({code_cells: code_cells});
}

class LocalStorage {
    constructor() {
        this.code_cells = getLocalStorage();
    }

    get getCells() {
        return this.code_cells;
    }

    addCell(cell_info) {
        this.code_cells.push(cell_info);
        updateLocalStorage(this.code_cells);
    }

    updateCell(cell_info) {
        let index_to_be_updated = getIndexObjectArray(this.code_cells, cell_info[ID_KEY]);
        this.code_cells[index_to_be_updated] = cell_info;
        updateLocalStorage(this.code_cells);
    }

    removeCell(id){
        let index_to_be_removed = getIndexObjectArray(this.code_cells, id);
        this.code_cells.splice(index_to_be_removed, 1);
    }
}
