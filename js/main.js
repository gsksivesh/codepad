$(document).ready(function () {
    let local_storage = new LocalStorage();
    const cell_template = `
    <div class="cp-cell" data-id="">
        <h1 class="cp-title">Double click to edit title</h1>
        <button class="cp-delete">Delete</button>
        <label>
            <textarea class="cp-code"></textarea>
        </label>
    </div>`;

    function renderFromData() {
        let cells = local_storage.getCells;
        for (let i = 0; i < cells.length; i++) {
            let $code_cell = $(cell_template);
            $code_cell.attr('data-id', cells[i][ID_KEY]);
            $code_cell.find('.cp-title').text(cells[i][TITLE_KEY]);
            $('#cp-add').before($code_cell);
            $code_cell.find('.cp-code').val(cells[i][CODE_KEY]);
        }
    }

    function updateData($code_cell) {
        let unique_id = $code_cell.attr('data-id');
        let title = $code_cell.find('.cp-title').text();
        let code = $code_cell.find('.cp-code').val();
        local_storage.updateCell({
            _id: unique_id,
            title: title,
            code: code
        });
    }

    function addData($code_cell) {
        let unique_id = $code_cell.attr('data-id');
        let title = $code_cell.find('.cp-title').text();
        let code = $code_cell.find('.cp-code').val();
        local_storage.addCell({
            _id: unique_id,
            title: title,
            code: code
        });
    }

    function deleteData($code_cell) {
        let unique_id = $code_cell.attr('data-id');
        local_storage.removeCell(unique_id);
    }

    $('#cp-add').on('click', function () {
        let timestamp = new Date().getTime();
        // using timestamp as unique id
        let $code_cell = $(cell_template);
        $($code_cell).attr('data-id', timestamp.toString());
        $(this).before($code_cell);
        addData($code_cell);
    });

    $(document).on('dblclick', '.cp-title', function () {
        let value = $(this).text();
        $(this).before(`<input class="cp-title-input" type="text" value="${value}">`);
        $(this).remove();
    });

    $(document).on('keyup input click', '.cp-title-input', function (event) {
        let key = event.which;
        if (key === 13) {
            let value = $(this).val();
            $(this).before(`<h1 class="cp-title">${value}</h1>`);
            updateData($(this.closest('.cp-cell')));
            $(this).remove();
        }
        if (event.type === 'click') {
            // providing support to click on other than this element
            event.stopPropagation();
        }
    });

    $(document).on('keyup input click', '.cp-code', function () {
        let $this = $(this);
        setTimeout(function () {
            updateData($this.closest('.cp-cell'));
        }, 500);
    });

    $(document).on('click', '.cp-delete', function () {
        let $code_cell = $(this).closest('.cp-cell');
        deleteData($code_cell);
        $code_cell.remove();
    });

    $(document).on('click', function () {
        let $input_elements = $('.cp-title-input');
        $input_elements.each(function (index, element) {
            let value = $(element).val();
            $(element).before(`<h1 class="cp-title">${value}</h1>`);
            updateData($(this.closest('.cp-cell')));
            $(element).remove();
        })
    });

    renderFromData();
});
