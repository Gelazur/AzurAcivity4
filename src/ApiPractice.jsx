import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function ApiPractice() {
  const [posts, setPosts] = useState([]);
  const [nextId, setNextId] = useState(1); // local id counter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Set document title on mount
  useEffect(() => {
    document.title = "API Functionality";
  }, []);

  // GET - clear sample data, start with empty list
  useEffect(() => {
    // no initial data from server, just ensure loading is false
    setLoading(false);
    setPosts([]);
  }, []);

  // POST - Add new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, {
        title: formData.title,
        body: formData.body,
        userId: 1,
      });

      // create local post object with sequential id
      const newPost = {
        id: nextId,
        title: formData.title,
        body: formData.body,
      };
      setNextId(nextId + 1);

      // append to end so IDs go from lowest to highest
      setPosts([...posts, newPost]);
      setFormData({ title: "", body: "" });
      toast.success("Post created successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit - Load post data into form
  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({ title: post.title, body: post.body });
    toast.info("Editing post...");
  };

  // PUT - Update post
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setUpdating(true);
      const response = await axios.put(`${API_URL}/${editingId}`, {
        title: formData.title,
        body: formData.body,
        userId: 1,
      });

      // Update post in the list
      setPosts(
        posts.map((post) => (post.id === editingId ? { ...post, title: formData.title, body: formData.body } : post))
      );
      setEditingId(null);
      setFormData({ title: "", body: "" });
      toast.success("Post updated successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  // DELETE - Remove post
  const handleDelete = async (id) => {
    try {
      setDeleting(id);
      await axios.delete(`${API_URL}/${id}`);

      // Remove post from the list
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", body: "" });
  };

  return (
    <div className="api-practice">
      <h2>API Practice - CRUD Operations</h2>

      {/* Form Section */}
      <div className="card">
        <h3>{editingId ? "Edit Post" : "Create New Post"}</h3>
        <form onSubmit={editingId ? handleUpdate : handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={submitting || updating}
          />

          <textarea
            placeholder="Post Body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            disabled={submitting || updating}
            rows="4"
          />

          <div className="btn-group">
            <button
              type="submit"
              disabled={submitting || updating}
            >
              {updating ? "Updating..." : submitting ? "Submitting..." : editingId ? "Update" : "Submit"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel"
                onClick={handleCancel}
                disabled={updating}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card">
          <p>Loading posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="card error">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Posts Table */}
      {!loading && posts.length > 0 && (
        <div className="card">
          <h3>Posts List</h3>
          <table className="posts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body.substring(0, 50)}...</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(post)}
                      disabled={deleting === post.id || updating}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id || updating}
                    >
                      {deleting === post.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && posts.length === 0 && !error && (
        <div className="card">
          <p>No posts found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}

export default ApiPractice;
