import Card from "../components/Card"
import { fetchUsers } from '../store/actions'
import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'

export default function Home(params) {
    const [search, setSearch] = useState('')
    const [filtered, setfiltered] = useState([])

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const sorted = useSelector(state => state.sorted)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const onChangeHandler = (e) => {
        e.preventDefault()
        let change = e.target.value
        setSearch(change)
        let re = new RegExp(change, "gi");
        setfiltered(sorted.filter(el => el.name.first.match(re)))
    }
    
    const resetHandler = (e) => {
        e.preventDefault()
        setSearch('')
        setfiltered([])
    }

    return (
        <>
        <div className="h-screen w-screen bg-gradient-to-b from-gray-200 to-white px-20 py-10 mmd:p-5">
            <div className="grid grid-cols-3">
            <div></div>
            <div>
                <form className="text-sm flex mb-6">
                    <div className=" w-[70%] rounded-md ">
                        <input type="text" value={search} className="border focus:outline-none focus:bg-gray-100 border-gray-200 w-full py-3 px-4" placeholder="Search" onChange={onChangeHandler} />
                    </div>
                    <div className="border-2 bg-white text-xs rounded-md w-[30%] py-3 text-center hover:scale-110">
                        {
                            !search.length
                            ?
                            <button type="click" onClick={() => setfiltered([...sorted])}> 
                                <p >SORT BY NAME</p>
                            </button>
                            :
                            <button type="reset" onClick={resetHandler} >
                                <p >CANCEL</p>
                            </button>
                        }
                    </div>
                </form>
            </div>
            </div>
            <div></div>
            <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {
                    users.length && !search.length
                    ? users.map((el) => (
                        <Card user={el} key={el.id} />
                    ))
                    : null
                }
                {
                    filtered.length
                    ? filtered.map((el) => (
                        <Card user={el} key={el.id} />
                    ))
                    : search.length
                        ? <div className="text-center w-max absolute">
                            There is no user
                        </div>
                        : null
                }
            </div>
        </div>
        </>
    )
}