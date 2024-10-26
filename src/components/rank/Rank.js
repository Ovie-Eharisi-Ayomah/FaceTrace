import React from "react";

const Rank = ({ userName, userEntries }) => {
    return(
        <div>
            <div className="tc pa2 f3">
                {`${userName}, your current entry count is...`}
            </div>
            <div className="tc pa2 f2">
                {userEntries}
            </div>
        </div>
    )
}

export default Rank;