// Specify export with declaration
export let expFoo = 'Exported Foo';


function expBar(){
    console.log("Exported function 'expBar'");
}
class ExpClass{
}

// Specify list of exported exported entities
export {expBar, ExpClass}

/**
 * NOTE: Sometimes it is handy to have a common 
 * export wrapper that wraps up mutiple other modules
 * and exports under one module name. It uses the
 * 're-exporting' syntax - 
 * 
 * export {someFoo as foo} from './someModule'
 * export * from './anotherModule'
 */

 /**
 * Default - export
 * We can specify an entity a default exported item
 * from a module/file
 * The import statement for this is subtle different
 * the import name is NOT Desctructured, and can be
 * any name for the imported entity!
 * You can have ONLY One default export from a file.
 * 
 * Default export is not generally good practice
 */

 export default class ExpDefault{}
 //default exported