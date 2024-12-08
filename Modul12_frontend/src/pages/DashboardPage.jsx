import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner, Stack, Toast, Form } from "react-bootstrap";
import { GetAllContents } from "../api/apiContent";
import { getThumbnail } from "../api";

const DashboardPage = () => {
    const [contents, setContents] = useState([]);
    const [comments, setComments] = useState({});
    const [selectedContent, setSelectedContent] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        GetAllContents()
            .then((data) => {
                setContents(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleShowComments = (contentId) => {
        setSelectedContent(contentId);
        setShowModal(true);
    };

    const handleAddComment = () => {
        if (newComment.trim() === "") {
            setToastMessage("Komentar tidak boleh kosong!");
            setIsToastVisible(true);
            return;
        }

        const newCommentData = {
            id: Date.now(),
            user: "Anonymous",
            text: newComment,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        };

        setComments((prevComments) => ({
            ...prevComments,
            [selectedContent]: [...(prevComments[selectedContent] || []), newCommentData],
        }));

        setNewComment("");
        setToastMessage("Komentar berhasil ditambahkan!");
        setIsToastVisible(true);
    };

    const handleEditComment = (commentId) => {
        setIsEditing(commentId);
        const commentToEdit = comments[selectedContent]?.find((comment) => comment.id === commentId);
        setEditedComment(commentToEdit.text);
    };

    const handleSaveEdit = (commentId) => {
        setComments((prevComments) => ({
            ...prevComments,
            [selectedContent]: prevComments[selectedContent]?.map((comment) =>
                comment.id === commentId
                    ? { ...comment, text: editedComment, updatedAt: new Date().toISOString() }
                    : comment
            ),
        }));

        setIsEditing(null);
        setEditedComment("");
        setToastMessage("Komentar berhasil diperbarui!");
        setIsToastVisible(true);
    };

    const handleDeleteComment = (commentId) => {
        setComments((prevComments) => ({
            ...prevComments,
            [selectedContent]: prevComments[selectedContent]?.filter((comment) => comment.id !== commentId),
        }));

        setToastMessage("Komentar berhasil dihapus!");
        setIsToastVisible(true);
    };

    return (
        <Container className="mt-4">
            <Stack direction="horizontal" gap={3} className="mb-3">
                <h1 className="h4 fw-bold mb-0 text-nowrap text-white">Rekomendasi Untukmu</h1>
                <hr className="border-top border-light opacity-50 w-100" />
            </Stack>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" size="lg" role="status" aria-hidden="true" />
                    <h6 className="mt-2 mb-0">Loading...</h6>
                </div>
            ) : contents?.length > 0 ? (
                <Row>
                    {contents?.map((content) => (
                        <Col md={6} lg={4} className="mb-3" key={content.id}>
                            <div className="card text-white bg-dark" style={{ aspectRatio: "16 / 9" }}>
                                <img
                                    src={getThumbnail(content.thumbnail)}
                                    className="card-img w-100 h-100 object-fit-cover bg-light"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{content.title}</h5>
                                    <p className="card-text">{content.description}</p>
                                    <Button
                                        variant="primary"
                                        className="w-100 mt-2"
                                        onClick={() => handleShowComments(content.id)}
                                    >
                                        Comment
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center text-white">Tidak ada konten untuk ditampilkan.</div>
            )}

            {/* Modal untuk Komentar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tuliskan komentar baru:</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Tuliskan komentar baru"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button variant="primary" className="ms-2" onClick={handleAddComment}>
                                Kirim
                            </Button>
                        </div>
                    </Form.Group>

                    <div className="comments-list mt-3">
                        {comments[selectedContent]?.length > 0 ? (
                            comments[selectedContent].map((comment) => (
                                <div
                                    key={comment.id}
                                    className="p-3 mb-2 rounded"
                                    style={{ backgroundColor: "#1e1e2f", color: "white" }}
                                >
                                    {isEditing === comment.id ? (
                                        <div>
                                            <Form.Control
                                                type="text"
                                                value={editedComment}
                                                onChange={(e) => setEditedComment(e.target.value)}
                                            />
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="mt-2 me-2"
                                                onClick={() => handleSaveEdit(comment.id)}
                                            >
                                                Update Comment
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => setIsEditing(null)}
                                            >
                                                Batal
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="mb-0">
                                                <strong>@{comment.user}</strong>
                                            </p>
                                            <p className="mb-1">{comment.text}</p>
                                            <small className="text-muted">
                                                Dibuat: {new Date(comment.createdAt).toLocaleString()}
                                                {comment.updatedAt && (
                                                    <> | Diperbarui: {new Date(comment.updatedAt).toLocaleString()}</>
                                                )}
                                            </small>
                                            <div className="mt-2">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditComment(comment.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Belum ada komentar.</p>
                        )}
                    </div>
                </Modal.Body>
            </Modal>

            <Toast
                onClose={() => setIsToastVisible(false)}
                show={isToastVisible}
                delay={3000}
                autohide
                className="position-fixed top-0 end-0 m-3"
                style={{ backgroundColor: "#007bff", color: "white", zIndex: 1050 }}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
};

export default DashboardPage;
