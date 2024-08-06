(function($){
    $.fn.tabGrid = function(options){
        const settings = $.extend({
            dataSource : 'local',
            fields : [],
            data : [],
            searchable : true,
            pageSize : 10
        }, options)

        if(typeof settings.fields !== 'object') settings.fields = []
        this.addClass('tabgrid-container')
        this.append(createToolbar())

        const header = createTableHeader(settings.fields)
        
        const tableBody = createTableCell(settings.fields, settings.data)
        this.append(createTable(header + tableBody))
        

        console.log(tableBody)
        if(settings.dataSource === 'local'){
           
        }
    }
})(jQuery)


function createTable(child){
    return `
    <div class="tabgrid-table-wrapper">
        <table class="tabgrid" id="tabGrid">
            ${child}
        </table>
    </div>
    `
}

function createTableHeader(fileds){
    const headers = [];
    fileds.forEach(field => {
            headers.push(`<th class="tabgrid-header-cell">${field.label}</th>`)
    });

    return `
        <thead>
             <tr class="tabgrid-header-row">
                ${headers.join("")}
             </tr>
        </thead>
    `
}

function createTableCell(fields, values){
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