import React from 'react';
import TabPanel from '../../components/tabPannel/TabPanel';
import InternalForApprovalView from './../../components/fixedAssetTransferApproval/InternalForApprovalView';
import ExternalForApprovalView from '../../components/fixedAssetTransferApproval/ExternalForApprovalView';
import Approval from '../../components/fixedAssetTransferApproval/Approval';

const FixedAssetTransferApproval = () => {
    return (
        <TabPanel
            tabData={[
                {
                    label: "Internal For Approval",
                    components: <InternalForApprovalView />
                },
                {
                    label: "External For Approval",
                    components: <ExternalForApprovalView />
                },
                {
                    label: "Approved",
                    components: <Approval />
                },
            ]}
        />
    );
};

export default FixedAssetTransferApproval;