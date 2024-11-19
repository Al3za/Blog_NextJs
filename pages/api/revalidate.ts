// // https://<your-site.com>/api/revalidate?secret=<token>
// // http://localhost:3000/api/revalidate?path=/&secret=alessandrotest
// // method http api/revalidate?path/=&, the path on says that you can use the revalidate method on all api paths;
// // https when yoy deploy the app (Http is more secure);

// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse) {

//     if (req.query.secret !== process.env.MY_SECRET_TOKEN)
//         return res.status(401).json({ message: "invalid token" }
//         );
//     const path = req.query.path as string // whe check the path an give an assertion as a string because path can be an array too
//     console.log(path, 'path') // the path in the string above is equal to / with point to our home page
//     await res.revalidate('/' /*path*/);// the path here ('/') refers to the Home page in the root app/page path.(where all posts are rendered); you can also point to a dinamic path like post/[postId] : post/1 (works only in the app folder i think)
//     return res.json({ revalidated: true });

// }; /// this works but its old 