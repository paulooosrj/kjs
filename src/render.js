import * as Handlebars from 'handlebars';

export default function Render(source, data = false){

    let template = Handlebars.compile(source);
    let dataSource = data || {};
    return template(dataSource);

};