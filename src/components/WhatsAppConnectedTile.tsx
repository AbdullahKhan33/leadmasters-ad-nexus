import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Settings, MessageCircle, Clock } from "lucide-react";
import { useWhatsAppConnection } from "@/hooks/useWhatsAppConnection";
import { useAuth } from "@/contexts/AuthContext";

interface WhatsAppConnectedTileProps {
  onManageConnection: () => void;
}

export function WhatsAppConnectedTile({ onManageConnection }: WhatsAppConnectedTileProps) {
  const { user } = useAuth();
  const {
    accounts,
    activeAccount,
    businessNames,
    getAccountsByBusiness,
    setActiveAccount,
  } = useWhatsAppConnection(user?.id);

  const [selectedBusiness, setSelectedBusiness] = useState(
    activeAccount?.business_name || businessNames[0] || ""
  );

  const businessAccounts = getAccountsByBusiness(selectedBusiness);
  const [selectedAccountId, setSelectedAccountId] = useState(
    activeAccount?.account_id || businessAccounts[0]?.account_id || ""
  );

  const selectedAccount = accounts?.find(
    (acc) => acc.account_id === selectedAccountId && acc.business_name === selectedBusiness
  );

  const handleBusinessChange = (businessName: string) => {
    setSelectedBusiness(businessName);
    const newAccounts = getAccountsByBusiness(businessName);
    if (newAccounts.length > 0) {
      setSelectedAccountId(newAccounts[0].account_id);
      setActiveAccount(newAccounts[0].id);
    }
  };

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
    const account = accounts?.find((acc) => acc.account_id === accountId);
    if (account) {
      setActiveAccount(account.id);
    }
  };

  const handlePhoneChange = (phoneNumber: string) => {
    const account = accounts?.find((acc) => acc.phone_number === phoneNumber);
    if (account) {
      setActiveAccount(account.id);
    }
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                WhatsApp Connected
              </h3>
              <p className="text-sm text-green-600">
                Your account is active and ready
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onManageConnection}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Business Name
            </label>
            <Select value={selectedBusiness} onValueChange={handleBusinessChange}>
              <SelectTrigger className="bg-white border-green-200">
                <SelectValue placeholder="Select business" />
              </SelectTrigger>
              <SelectContent>
                {businessNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Account Number
            </label>
            <Select value={selectedAccountId} onValueChange={handleAccountChange}>
              <SelectTrigger className="bg-white border-green-200">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {businessAccounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.account_id}>
                    {acc.account_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              WhatsApp Number
            </label>
            <Select
              value={selectedAccount?.phone_number || ""}
              onValueChange={handlePhoneChange}
            >
              <SelectTrigger className="bg-white border-green-200">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {businessAccounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.phone_number}>
                    {acc.phone_display_name} ({acc.phone_number})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Messages Today</p>
              <p className="text-sm font-semibold text-gray-900">247</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Active Chats</p>
              <p className="text-sm font-semibold text-gray-900">18</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Last Sync</p>
              <p className="text-sm font-semibold text-gray-900">2 min ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
