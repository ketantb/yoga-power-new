import React from 'react'

const useJobProfileHook = () => {
  return (
    function extractKeyValuePairs(inputString='') {
      
      
            var keyValuePairs = {};
            var contentWithoutColons = "";
          
            // Find content not wrapped in brackets
            var nonBracketContent = inputString.trim().replace(/\[([^\]]*)\]\s*:\s*\(([^)]*)\)/g, '');
          
            // Check if there's content without colons
            contentWithoutColons = nonBracketContent.trim();
          
            // Extract key-value pairs
            var regex = /\[([^\]]*)\]\s*:\s*\(([^)]*)\)/g;
            var match;
          
            while ((match = regex.exec(inputString)) !== null) {
              var key = match[1].trim();
              var value = match[2].trim();
              keyValuePairs[key] = value;
            }
          
            if (contentWithoutColons) {
              keyValuePairs[''] = contentWithoutColons;
            }
          
            
        return Object.entries(keyValuePairs).map((el)=>
    <div className="text-start">
    <h6>{(el[0])||''}</h6> 
    <ol>
    {(el[1].split(/\$brsplit/)||'').map((el)=>
    !el?.trim()?'':<li>{el}</li>
    )}
    </ol>
    </div>
    );
      }    
      
  )
}

export default useJobProfileHook
