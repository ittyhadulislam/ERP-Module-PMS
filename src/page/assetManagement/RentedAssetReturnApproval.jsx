import React from 'react';
import TabPanel from '../../components/tabPannel/TabPanel';
import ForApprovalView from '../../components/rentedAssetApproval/ForApprovalView';
import ApprovedView from '../../components/rentedAssetApproval/ApprovedView';

const RentedAssetReturnApproval = () => {
    return (
        <TabPanel
            tabData={[
                {
                    label: "For Approval",
                    components: <ForApprovalView />
                },
                {
                    label: "Approved",
                    components: <ApprovedView />
                },
            ]}
        >

        </TabPanel>
    );
};

export default RentedAssetReturnApproval;