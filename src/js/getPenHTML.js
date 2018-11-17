const { __ } = wp.i18n;

export default function getPenHTML( attributes, className='codepen-embed', isEditor=false ){
    const { penID, penTheme, penHeight, penURL, penType , clickToLoad} = attributes;

    if( penID === null && penURL === '' ){
        return null
    }

    if( null === penID ){
        return (
            <p className="codepen error" style={{textAlign: 'center'}}>
                {__( 'The pen URL is invalid.')  }
            </p>
        )
    }


    let embedUrlPrefix = '//codepen.io/anon/embed';
    if( clickToLoad ) {
        embedUrlPrefix += '/preview';
    }

    return (
        <div>
            <iframe 
                id={`cp_embed_${penID}`} 
                src={`${embedUrlPrefix}/${penID}?height=${penHeight}&amp;theme-id=${penTheme}&amp;slug-hash=${penID}&amp;default-tab=${penType}&amp;animations=stop-after-5&amp;preview=true&amp;user=anon`} 
                height={penHeight} 
                scrolling="no" 
                frameborder="0" 
                allowTransparency={true} 
                allowFullScreen={true} 
                allowpaymentrequest="true" 
                name={`CodePen Embed ${penID}`} 
                title={`CodePen Embed ${penID}`} 
                className={'cp_embed_iframe'} 
                style={{width: "100%", overflow: "hidden"}}
            >
            </iframe>
        </div>
    );

    /*
    // Old JavaScript embed code
    const jsScript = (<script async src="//codepen.io/assets/embed/ei.js"></script>);
    return (
        <div className={className}>
            <p 
                className="codepen" 
                data-height={penHeight} 
                data-theme-id={penTheme} 
                data-slug-hash={penID} 
                data-default-tab={penType} 
                data-animations='stop-after-5' 
                data-preview={clickToLoad}
            >
                {penURL}
            </p>
            {jsScript}
        </div>
    );
    */
}