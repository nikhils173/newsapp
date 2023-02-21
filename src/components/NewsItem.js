
const NewsItem =(props) =>
 {
    let {title,description,imageUrl,newsUrl,publishedAt,author,name} = props
    return (
      <div className='my-3'>
        <div className="card">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-warning" style={{left:'90%', zIndex:'1'}}>{name}</span>
            <img src={!imageUrl?"https://c.ndtvimg.com/2019-11/5jbq5iho_aaditya-thackeray-instagram_625x300_14_November_19.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn btn-primary">Read More</a>
                <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {publishedAt}</small></p>
            </div>
        </div>
      </div>
    )
  }


export default NewsItem