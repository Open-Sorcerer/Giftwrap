export interface Main {
  route: MainRoute;
}

export interface MainRoute {
  estimate: Estimate;
  params: Params;
  transactionRequest: TransactionRequest;
}

export interface Estimate {
  fromAmount: string;
  sendAmount: string;
  toAmount: string;
  toAmountMin: string;
  fromAmountUSD: string;
  route: EstimateRoute;
  feeCosts: FeeCost[];
  gasCosts: GasCost[];
  estimatedRouteDuration: number;
  isExpressSupported: boolean;
  exchangeRate: string;
  aggregatePriceImpact: string;
  toAmountUSD: string;
  toAmountMinUSD: string;
}

export interface FeeCost {
  name: string;
  description: string;
  percentage: string;
  token: Token;
  amount: string;
  amountUSD: string;
}

export interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  coingeckoId: string;
  bridgeOnly?: boolean;
  commonKey?: string;
}

export interface GasCost {
  type: string;
  token: Token;
  amount: string;
  amountUSD: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  estimate: string;
  limit: string;
}

export interface EstimateRoute {
  fromChain: Chain[];
  toChain: Chain[];
}

export interface Chain {
  type: string;
  dex: Dex;
  target: string;
  path: string[];
  poolFees: number[];
  swapType: string;
  squidCallType: number;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  toAmountMin: string;
  exchangeRate: string;
  priceImpact: string;
  isFrom: boolean;
  dynamicSlippage: number;
}

export interface Dex {
  chainName: string;
  dexName: string;
  swapRouter: string;
  quoter: string;
  isCrypto: boolean;
  isStable?: boolean;
}

export interface Params {
  integratorId: string;
  collectFees: CollectFees;
  enableExpress: boolean;
  slippage: number;
  quoteOnly: boolean;
  toAddress: string;
  fromAddress: string;
  fromAmount: string;
  toToken: Token;
  fromToken: Token;
  toChain: string;
  fromChain: string;
}

export interface CollectFees {
  feeLocation: string;
}

export interface TransactionRequest {
  routeType: string;
  targetAddress: string;
  data: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

export interface IDb {
  createdBy: string;
  amount: number;
  type: string;
}
