import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://journal-journey-api.onrender.com/images/";

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <div className="postCats">
          {post.categories.map((c) => (
            <Link to={`/?cat=${c}`} key={c} className="link">
              <span key={c} className="postCat">
                {c}
              </span>
            </Link>
          ))}
        </div>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
