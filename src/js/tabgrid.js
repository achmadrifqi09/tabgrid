(function($){
    $.fn.tabGrid = function(options){
        const defaults = {
            dataSource : 'local',
            fields : [],
            data : [],
            searchable : true,
            pageSize : 10,
            emptyMessage : "Data not found",
            filtering : true
        };

        const settings = $.extend({}, defaults, options);
        if(typeof settings.fields !== 'object') settings.fields = []

        this.addClass('tabgrid-container')
        this.append(createToolbar())

        const header = createTableHeader(settings.fields, settings.filtering)
      
        const tableBody = typeof settings.data !== 'undefined' && settings.data !== null && settings.data.length !== 0 ? 
            createTableBody(settings.fields, settings.data) : 
            emptyTable(settings.emptyMessage, settings.fields.length);

        this.append(createTable(header + tableBody))

        if(settings.dataSource === 'local'){
           
        }
    }
})(jQuery)


function emptyTable(message, rowLength){
    return `
        <tbody>
            <tr class="tabgrid-row">
                <td class="tabgrid-cell text-center" colspan="${rowLength}">${message}</td?
            </tr>
        </tbody>
    `
}

function createTable(child){
    return `
    <div class="tabgrid-table-wrapper">
        <table class="tabgrid" id="tabGrid">
            ${child}
        </table>
    </div>
    `
}

function createTableHeader(fields, isFilter){
    const headers = [];
    fields.forEach(field => {
            
            headers.push(
                isFilter ? `<th class="tabgrid-header-cell-filter" data-tg-head-key="${field.key}">${field.label}</th>` :
                 `<th class="tabgrid-header-cell">${field.label}</th>`)
    });

    return `
        <thead>
             <tr class="tabgrid-header-row">
                ${headers.join("")}
             </tr>
        </thead>
    `
}

function createTableBody(fields, values){
    const rows = [];

    values.forEach((value) => {
        const tableRow = [];
        fields.forEach((field) => {
           tableRow.push(`<td class="tabgrid-cell">${value[field.key]}</td>`)
        })
        rows.push(`<tr class="tabgrid-row">${tableRow.join("")}</tr>`)
    })

    return `<tbody>${rows.join("")}</tbody>`
}


function createToolbar(){
    return `
        <div class="tabgrid-toolbar">
            <input type="text" id="search" class="tabgrid-search" placeholder="Search ...">
            <select name="" id="" class="tabgrid-page-size">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    `
}