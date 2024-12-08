import { 
    Container, 
    Table, 
    Stack, 
    Button, 
    Spinner, 
    Alert, 
} from "react-bootstrap"; 

import { FaTrash } from "react-icons/fa"; 
import { toast } from "react-toastify"; 

import ModalCreateContent from "../components/modals/ModalCreateContent"; 
import ModalEditContent from "../components/modals/ModalEditContent"; 

import { GetMyContents, DeleteContent } from "../api/apiContent"; 
import { useEffect, useState } from "react"; 
import { getThumbnail } from "../api"; 

const ContentPage = () => { 
    const [isLoading, setIsLoading] = useState(false); 
    const [contents, setContents] = useState([]); 
    const [pendingDeletes, setPendingDeletes] = useState([]); 
    const [showCreateModal, setShowCreateModal] = useState(false); 

    const fetchContents = () => { 
        setIsLoading(true); 
        GetMyContents()
            .then((response) => { 
                setContents(response); 
                setIsLoading(false); 
            })
            .catch((err) => { 
                console.log(err); 
                setIsLoading(false); 
                toast.error("Terjadi kesalahan saat memuat data."); 
            }); 
    }; 

    const deleteContent = (id) => { 
        setPendingDeletes((prev) => [...prev, id]); 
        DeleteContent(id)
            .then((response) => { 
                setPendingDeletes((prev) => prev.filter((deleteId) => deleteId !== id)); 
                toast.success(response.message); 
                fetchContents(); 
            })
            .catch((err) => { 
                console.log(err); 
                setPendingDeletes((prev) => prev.filter((deleteId) => deleteId !== id)); 
                toast.error("Gagal menghapus konten."); 
            }); 
    }; 

    useEffect(() => { 
        fetchContents(); 
    }, []); 

    return ( 
        <Container className="mt-4"> 
            <Stack direction="horizontal" gap={3} className="mb-3"> 
                <h1 className="h4 fw-bold mb-0 text-nowrap text-white">My Videos</h1> 
                <hr className="border-top border-light opacity-50 w-100" /> 
                <div className="ms-auto text-nowrap"> 
                    <ModalCreateContent 
                        onClose={fetchContents} 
                        show={showCreateModal} 
                        onHide={() => setShowCreateModal(false)} 
                    /> 
                    <Button 
                        variant="primary" 
                        onClick={() => setShowCreateModal(true)} 
                    >
                        Tambah Video
                    </Button>
                </div> 
            </Stack> 
            {isLoading ? ( 
                <div className="text-center"> 
                    <Spinner 
                        as="span" 
                        animation="border"
                        variant="primary" 
                        size="lg" 
                        role="status" 
                        aria-hidden="true" 
                    /> 
                    <h6 className="mt-2 mb-0">Loading...</h6> 
                </div> 
            ) : (contents?.length > 0 ? ( 
                <Table variant="dark" striped bordered hover className="bg-dark"> 
                    <thead> 
                        <tr> 
                            <th>No</th> 
                            <th style={{ width: "200px" }}>Thumbnail</th> 
                            <th>Title</th> 
                            <th>Description</th> 
                            <th>Action</th> 
                        </tr> 
                    </thead> 
                    <tbody> 
                        {contents?.map((content, index) => ( 
                            <tr key={content.id}> 
                                <td>{index + 1}</td> 
                                <td> 
                                    <img 
                                        src={content.thumbnail ? getThumbnail(content.thumbnail) : "/path/to/placeholder.jpg"} 
                                        alt="Thumbnail" 
                                        className="object-fit-cover" 
                                        style={{ width: "200px", aspectRatio: "16 / 9"}} 
                                    /> 
                                </td> 
                                <td>{content.title}</td> 
                                <td>{content.description}</td> 
                                <td> 
                                    <Stack direction="horizontal" gap={2}> 
                                        <ModalEditContent 
                                            content={content} 
                                            onClose={fetchContents} 
                                        /> 
                                        <Button 
                                            variant="danger" 
                                            disabled={pendingDeletes.includes(content.id)} 
                                            onClick={() => deleteContent(content.id)}
                                        > 
                                            {pendingDeletes.includes(content.id) ? ( 
                                                <Spinner 
                                                    as="span" 
                                                    animation="grow" 
                                                    size="sm" 
                                                    role="status" 
                                                    aria-hidden="true" 
                                                /> 
                                            ) : ( 
                                                <FaTrash className="mx-1 mb-1" /> 
                                            )} 
                                            Hapus 
                                        </Button> 
                                    </Stack> 
                                </td> 
                            </tr> 
                        ))} 
                    </tbody> 
                </Table> 
            ) : ( 
                <Alert variant="dark" className="mt-3 text-center"> 
                    Belum ada video, yuk tambah video baru! 
                </Alert> 
            ))} 
        </Container> 
    ); 
}; 

export default ContentPage; 
