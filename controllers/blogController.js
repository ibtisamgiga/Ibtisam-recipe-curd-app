const Blog = require('../model/blogs')

const blog_details = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    console.log(blog)

    if (!blog) return res.status(404).render('404', { title: '404' });
    res.render('details', { blog: blog });

}



const blog_index = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('smoothies', { blogs });
    }
    catch (err) {
        res.send(err)
    }


}

const blog_indexall = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('smoothies2', { blogs });
    }
    catch (err) {
        res.send(err)
    }


}





const blog_create_post = async (req, res) => {

    const blog = new Blog(req.body)
    const result = await blog.save()
    console.log(result)
    res.redirect('/blogs')

}


const blog_delete = async (req, res) => {
    const blog = await Blog.findByIdAndDelete( req.params.id)
    if (!blog) return res.status(404).render('404', { title: '404' });;
    res.json({ redirect: '/blogs' })
}

const blog_update = async (req, res) => {

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('404');

    res.render('update', { blog: blog });





}


const blog_update_post = async (req, res) => {

    // const blog = new Blog(req.body)
    // const result = await blog.save()
    // console.log(result)
    
    try {
        console.log('Request fired')
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                snippet: req.body.snippet,
                body: req.body.body,
                imageUrl: req.body.imageUrl,
            }
        }, { new: true });
      //res.redirect('/blogs/blogsall')
      res.json({success : true}) 
    } catch (e) {
        console.log(e)
    }

   // res.redirect('/blogs/blogsall')
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_delete,
    blog_indexall,
    blog_update,
    blog_update_post
}