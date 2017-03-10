export class RecipeModel {

    model;

    constructor() {
        this.init();
    }

    init() {
        this.model = {
            namespace: "jsreport",
            entityTypes: {
                "RecipeType": {
                    "_id": {"type": "Edm.String", key: true},
                    "title": {"type": "Edm.String"},            
                    "description": {"type": "Edm.String"},            
                    "document_data": { type: "document_data" },            
                }                           
            },
            complexTypes: {
                    "document_data": {
                    "description": {"type": "Edm.String"},
                    "headnote": {"type": "Edm.String"},
                },
            },  
            entitySets: {
                "recipes": {
                    entityType: "jsreport.RecipeType"
                }
            }
        }
    }

}

const recipeModel = new RecipeModel();
recipeModel.init();

export default recipeModel.model;