"use strict";
class RecipeModel {
    constructor() {
        this.init();
    }
    init() {
        this.model = {
            namespace: "jsreport",
            entityTypes: {
                "RecipeType": {
                    "_id": { "type": "Edm.String", key: true },
                    "title": { "type": "Edm.String" },
                    "description": { "type": "Edm.String" },
                    "document_data": { type: "document_data" },
                }
            },
            complexTypes: {
                "document_data": {
                    "description": { "type": "Edm.String" },
                    "headnote": { "type": "Edm.String" },
                },
            },
            entitySets: {
                "recipes": {
                    entityType: "jsreport.RecipeType"
                }
            }
        };
    }
}
exports.RecipeModel = RecipeModel;
const recipeModel = new RecipeModel();
recipeModel.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = recipeModel.model;
//# sourceMappingURL=recipe.js.map