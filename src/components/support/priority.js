import React from 'react'

function priority() {
    const priority = "Critical"
    return (
        <div>

            {(() => {
                if (priority === "high") {
                    return (<div style={{ color: "blue" }}>high</div>)
                }
                else if (priority === "Critical") {
                    return (<div style={{ color: "green" }}>Critical</div>)
                }
            })()}

        </div>
    )
}

export default priority
