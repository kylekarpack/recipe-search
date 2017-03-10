
// interface to define a recipe item
declare module Recipe {

    export interface IId {
        $oid: string;
    }

    export interface IInstruction {
        id: number;
        content: string;
    }

    export interface IIngredient {
        kind: string;
        name: string;
        plural_name: string;
        review_path: string;
    }

    export interface IRecipeIngredient {
        id: number;
        quantity: string;
        measurement: string;
        pre?: any;
        post: string;
        plural_ingredient: boolean;
        ingredient: IIngredient;
    }

    export interface IRecipeIngredientGroup {
        id: number;
        name?: any;
        recipe_ingredients: IRecipeIngredient[];
    }

    export interface IPhoto {
        alt: string;
        filename: string;
        hero_image_url: string;
        id: number;
        image_url: string;
        original_image_url: string;
        width: number;
        height: number;
    }

    export interface IRecipe {
        _id: IId;
        description: string;
        headnote: string;
        id: number;
        instructions: IInstruction[];
        recipe_reviewables: any[];
        slug: string;
        title: string;
        web_url: string;
        yields: string;
        recipe_ingredient_groups: IRecipeIngredientGroup[];
        asides: any[];
        photo: IPhoto;
        video?: any;
    }

}