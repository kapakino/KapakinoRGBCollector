import React,{useEffect} from "react";

const handleScraping = (e)=>{
    e.preventDefault();
    console.log('Scraping')
};
const handleValuable = (e)=>{
    e.preventDefault();
    console.log('Value been sended')
};

export const Upper = ()=>{
    useEffect(() => {
        console.log('Component has been rendered');
      }, []);
    return (
        <>
            <form onSubmit={handleScraping}>
                <fieldset id="outter_keyword">
                <legend className="heading">keyword input</legend>
                <label htmlFor="keyword">
                    keyword(delimiter with comma)
                    <br />
                    <textarea
                    name="keyword"
                    id="keyword"
                    cols={30}
                    rows={10}
                    />
                </label>
                <br />
                <label htmlFor="website">
                    website for mining
                    <br />
                    <input type="text" name="website" />
                    <br />
                </label>
                <input type="submit" defaultValue="submit" />
                </fieldset>
            </form>
            <form onSubmit={handleValuable}>
                <fieldset id="outter_variable">
                <legend className="heading">variable adjust</legend>
                <label htmlFor="data">
                    Data to compare(Enter a number)
                    <br />
                    <input name="data" type="text" />
                </label>
                <br />
                <input type="submit" defaultValue="submit" />
                </fieldset>
            </form>
        </>
    )
}