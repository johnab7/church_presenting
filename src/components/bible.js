import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import Select from 'react-dropdown-select';
import Form from 'react-bootstrap/Form'
import tbible from "./data/biblet.json"
import bible from "./data/bible.json"
import Button from 'react-bootstrap/Button'

const Bible = () => {
    const LIMIT = 50
    const mc = new BroadcastChannel('mc');
    const options = [{ label: "Genesis", value: 1 }, { label: "Exodus", value: 2 }, { label: "Leviticus", value: 3 }, { label: "Numbers", value: 4 }, { label: "Deuteronomy", value: 5 }, { label: "Joshua", value: 6 }, { label: "Judges", value: 7 }, { label: "Ruth", value: 8 }, { label: "1 Samuel", value: 9 }, { label: "2 Samuel", value: 10 }, { label: "1 Kings", value: 11 }, { label: "2 Kings", value: 12 }, { label: "1 Chronicles", value: 13 }, { label: "2 Chronicles", value: 14 }, { label: "Ezra", value: 15 }, { label: "Nehemiah", value: 16 }, { label: "Esther", value: 17 }, { label: "Job", value: 18 }, { label: "Psalm", value: 19 }, { label: "Proverbs", value: 20 }, { label: "Ecclesiastes", value: 21 }, { label: "Song of Solomon", value: 22 }, { label: "Isaiah", value: 23 }, { label: "Jeremiah", value: 24 }, { label: "Lamentations", value: 25 }, { label: "Ezekiel", value: 26 }, { label: "Daniel", value: 27 }, { label: "Hosea", value: 28 }, { label: "Joel", value: 29 }, { label: "Amos", value: 30 }, { label: "Obadiah", value: 31 }, { label: "Jonah", value: 32 }, { label: "Micah", value: 33 }, { label: "Nahum", value: 34 }, { label: "Habakkuk", value: 35 }, { label: "Zephaniah", value: 36 }, { label: "Haggai", value: 37 }, { label: "Zechariah", value: 38 }, { label: "Malachi", value: 39 }, { label: "Matthew", value: 40 }, { label: "Mark", value: 41 }, { label: "Luke", value: 42 }, { label: "John", value: 43 }, { label: "Acts", value: 44 }, { label: "Romans", value: 45 }, { label: "1 Corinthians", value: 46 }, { label: "2 Corinthians", value: 47 }, { label: "Galatians", value: 48 }, { label: "Ephesians", value: 49 }, { label: "Philippians", value: 50 }, { label: "Colossians", value: 51 }, { label: "1 Thessalonians", value: 52 }, { label: "2 Thessalonians", value: 53 }, { label: "1 Timothy", value: 54 }, { label: "2 Timothy", value: 55 }, { label: "Titus", value: 56 }, { label: "Philemon", value: 57 }, { label: "Hebrews", value: 58 }, { label: "James", value: 59 }, { label: "1 Peter", value: 60 }, { label: "2 Peter", value: 61 }, { label: "1 John", value: 62 }, { label: "2 John", value: 63 }, { label: "3 John", value: 64 }, { label: "Jude", value: 65 }, { label: "Revelation", value: 66 }];
    var [previewLive, setPreviewLive] = useState();
    var [book, setBook] = useState();
    var [his, setHis] = useState();



    useEffect(() => {
        var h = localStorage.getItem("h")
        if (h === null) {
            localStorage.setItem("h", "[]")
        }
        console.log(h)
        h = JSON.parse(h)
        setHis(h)
    }, []);


    function truncateString(string, limit) {
        if (string.length > limit) {
            return string.substring(0, limit) + "..."
        } else {
            return string
        }
    }


    function relode() {
        setHis(JSON.parse(localStorage.getItem("h")))
    }

    function addHis(t,l) {
        // t.e = truncateString(t.e, LIMIT);
        t = t.e.concat(t.r);
        // t = t.e.concat(t.r)
        let h = localStorage.getItem("h")
        h = JSON.parse(h)
            h.push({
                h: t,
                l:l
            })
        localStorage.setItem("h", JSON.stringify(h))
        relode()
    }

    function sendLive(mes) {

        mc.postMessage(mes)
    }

    function clear() {
        sendLive(" ");
    }

    function getLive(l) {
        let br = "<br/>"
        let h = "<div style=\"padding: 2vh;\">"
        let f = "</div>"
        return h + l.e + br + l.t + br + br + l.r + f
    }

    function getRef(bookf, chapter, verse) {
        return "-" + bookf.label + " " + chapter + ":" + verse
    }
    function del(d) {
        let c = localStorage.getItem("h")
        c = JSON.parse(c)
        if (d > -1) {
            c.splice(d, 1);
        }        localStorage.setItem("h",JSON.stringify(c))
        relode()
    }
    function getVerce(bookf, chapter, verse) {
        let book = bookf.value
        let e = bible.Book[book - 1].Chapter[chapter - 1].Verse[verse - 1].Verse;
        let t = tbible.Book[book - 1].Chapter[chapter - 1].Verse[verse - 1].Verse;
        let r = getRef(bookf, chapter, verse)
        let c = {
            e: e,
            t: t,
            r: r
        }
        return c
    }


    return (
        <div>
            <br></br>
            <div className="cen">
                <p>{previewLive}</p>
            </div>
            <br></br>
            <div className='bible-select-div center'>
                <Formik
                    initialValues={{}}
                    onSubmit={(obj) => {
                        obj.book = book[0]
                        var l = getVerce(obj.book, obj.chapter, obj.verse)
                        setPreviewLive(l.e + " " + l.r)
                        sendLive(getLive(l))
                       // addHis(l,{b:obj.book.value,c: obj.chapter,v: obj.verse})
                        console.log(l.r)
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,

                      }) => (

                        <div>
                            <form
                                id="contact-form"
                                className="contact-form"
                                onSubmit={handleSubmit}

                            >
                                <Form.Group className="mb-3">
                                    <Form.Label>Book</Form.Label>


                                    <Select
                                        options={options}
                                        onChange={(values) => setBook(values)}
                                        clearable="true"
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3">
                                    <Form.Label>Chapter</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="chapter"
                                        name="chapter"
                                        min="1"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Verse</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="verse"
                                        name="verse"
                                        min="1"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div className="cen">
                                    <Button type="submit" variant="primary" className="cen">Go Live</Button>
                                    <Button variant="warning" className="cen btn-mar"
                                            onClick={() => clear()}>Clear</Button>

                                </div>
                            </form>
                            <br></br>
                        </div>
                    )}
                </Formik>






                {/*{his && his.map((item) => (*/}
                {/*    <pre>{JSON.stringify(item)}</pre>*/}
                {/*    // <Col>*/}
                {/*    //     <Card style={{ width: '18rem' }}>*/}
                {/*    //         <Card.Body>*/}
                {/*    //             <div className="cen">*/}
                {/*    //                 <Card.Text>*/}
                {/*    //                     {truncateString(item.c, 600)}*/}
                {/*    //                 </Card.Text>*/}
                {/*    //                 <Button variant="primary" onClick={() => sendLive(item.c)}>Go Live</Button>{"    "}*/}
                {/*    //                 <Button variant="danger" className="btm-mar" onClick={() => del(items.indexOf(item))}>Delete</Button>*/}
                {/*    //*/}
                {/*    //             </div>*/}
                {/*    // </Card.Body>*/}
                {/*    //     </Card></Col>*/}
                {/*        ))}*/}


            </div>
        </div>
    );
}
export default Bible;