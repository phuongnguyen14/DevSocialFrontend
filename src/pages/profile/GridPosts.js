export default function GridPosts() {
  return (
    <div className="createPost">
      
      <div className="create_splitter"></div>
      <div className="createPost_body grid2">
        <div className="view_type active">
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className="view_type">
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
}
