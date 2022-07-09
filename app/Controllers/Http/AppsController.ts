 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import {string} from '@ioc:Adonis/Core/Helpers'
import session from '../../../config/session';
 import Article from '../../Models/Article';
import UpdateArticleValidator from '../../Validators/UpdateArticleValidator';
import Database from '@ioc:Adonis/Lucid/Database';
export default class AppsController {

    async index ({view, request}: HttpContextContract) {
         const page =request.input("page", 1);
        let posts = await Database.from(Article.table).paginate(page, 3);
       // let posts = await Article.all();
        let current_page = request.input("page", 1)
        //return current_page
        return view.render('blog.index', {posts, current_page});
    }
    async show ({params, view}: HttpContextContract) {
        let post = await Article.findOrFail(params.id);
        return view.render('blog.show', {post});
    }

    async edit({params, view}: HttpContextContract) {
        let post = await Article.findOrFail(params.id);
        return view.render('blog.edit', {post});
    } // session.flash({
        //     success: "l'article a bien été modifié"
        // });
    async update({params, request, response}: HttpContextContract) {
        const post = await Article.findOrFail(params.id);
        post.merge(await request.validate(UpdateArticleValidator));
        await post.save();
       
        return response.redirect('/article/'+params.id);
    }
    async create({request, response}: HttpContextContract) {
       const file =    await request.file('image');
       const post = new Article();  
       if(file){
        const nom = string.generateRandom(32)+'.'+file.extname;
        await file.moveToDisk('./', {name: nom});
        post.image = nom;
       }
          
        
        post.merge(await request.validate(UpdateArticleValidator));
        await post.save();
        return response.redirect().toRoute('accueil');
    }
    async creation_article({view}: HttpContextContract) {
        return view.render('blog.create');
    }
    async destroy({params, response}: HttpContextContract) {
        const post = await Article.findOrFail(params.id);
        await post.delete();
        return response.redirect('/accueil');
    }

}
