import { PageTemplate } from "./PageTemplate.jsx";
import { AllPlans } from "../components/AllPlans.jsx";

export function PlanPage() {
    return (
        <PageTemplate>
            <h2>Check saved plans</h2>
            <div>
                <AllPlans />
            </div>
        </PageTemplate>
    );
};
