 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import session from '../../../config/session';
 import Article from '../../Models/Article';
import UpdateArticleValidator from '../../Validators/UpdateArticleValidator';
export default class AppsController {

    async index ({view}: HttpContextContract) {
        let posts = await Article.all();
        
        return view.render('blog.index', {posts});
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
        const post = new Article();
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
